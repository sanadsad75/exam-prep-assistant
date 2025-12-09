const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const pptx2json = require('pptx2json');
const fs = require('fs');
const path = require('path');

/**
 * Parse different document types and extract text content
 */
class DocumentParser {
  async parseFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    switch (ext) {
      case '.pdf':
        return await this.parsePDF(filePath);
      case '.docx':
      case '.doc':
        return await this.parseDOCX(filePath);
      case '.pptx':
      case '.ppt':
        return await this.parsePPTX(filePath);
      case '.txt':
        return await this.parseTXT(filePath);
      case '.jpg':
      case '.jpeg':
      case '.png':
      case '.gif':
      case '.webp':
        return await this.parseImage(filePath);
      default:
        throw new Error(`Unsupported file type: ${ext}`);
    }
  }

  async parsePDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return {
      text: data.text,
      pages: data.numpages,
      info: data.info
    };
  }

  async parseDOCX(filePath) {
    const result = await mammoth.extractRawText({ path: filePath });
    return {
      text: result.value,
      messages: result.messages
    };
  }

  async parsePPTX(filePath) {
    try {
      const data = await pptx2json(filePath);

      // Extract text from all slides
      let allText = '';
      if (data && data.slides) {
        data.slides.forEach((slide, index) => {
          allText += `\n--- Slide ${index + 1} ---\n`;

          // Extract text from slide elements
          if (slide.text) {
            allText += slide.text.join('\n') + '\n';
          }

          // Extract text from shapes
          if (slide.shapes) {
            slide.shapes.forEach(shape => {
              if (shape.text) {
                allText += shape.text + '\n';
              }
            });
          }
        });
      }

      return {
        text: allText.trim() || 'No text content found in PowerPoint',
        slides: data?.slides?.length || 0
      };
    } catch (error) {
      console.error('PPTX parsing error:', error);
      // Fallback: try to read as text
      return {
        text: 'PowerPoint file uploaded but could not extract text content. Please ensure the file is not corrupted.',
        slides: 0
      };
    }
  }

  async parseTXT(filePath) {
    const text = fs.readFileSync(filePath, 'utf-8');
    return {
      text: text
    };
  }

  async parseImage(filePath) {
    // For images, we don't extract text but store metadata
    // Images will be displayed in the UI
    const fileName = path.basename(filePath);
    return {
      text: `[Image: ${fileName}]`,
      isImage: true,
      imagePath: filePath
    };
  }

  async parseMultipleFiles(files) {
    const results = [];
    const images = [];

    for (const file of files) {
      try {
        const parsed = await this.parseFile(file.path);

        // If it's an image, store it separately
        if (parsed.isImage) {
          images.push({
            filename: file.originalname,
            path: file.path,
            url: `/uploads/${path.basename(file.path)}`,
            mimetype: file.mimetype,
            size: file.size
          });
        }

        results.push({
          filename: file.originalname,
          path: file.path,
          content: parsed.text,
          isImage: parsed.isImage || false,
          metadata: {
            size: file.size,
            mimetype: file.mimetype,
            ...parsed
          }
        });
      } catch (error) {
        console.error(`Error parsing ${file.originalname}:`, error);
        results.push({
          filename: file.originalname,
          error: error.message
        });
      }
    }

    return { documents: results, images };
  }
}

module.exports = new DocumentParser();
