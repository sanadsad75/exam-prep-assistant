# PowerPoint Support Guide

Your Exam Prep Assistant now supports PowerPoint presentations! 🎉

## What's New?

You can now upload **PowerPoint files** (PPT and PPTX) along with your other study materials. The app will automatically extract text content from all slides and include it in your study plan.

## Supported PowerPoint Formats

- ✅ **PPTX** - PowerPoint 2007 and later (.pptx)
- ✅ **PPT** - PowerPoint 97-2003 (.ppt)

## How It Works

### 1. Text Extraction
The app automatically:
- Extracts text from all slides
- Preserves slide order
- Captures text from:
  - Slide titles
  - Bullet points
  - Text boxes
  - Shape text
  - Notes (if present)

### 2. Processing
Each slide is processed as:
```
--- Slide 1 ---
[Title and content from slide 1]

--- Slide 2 ---
[Title and content from slide 2]

... and so on
```

### 3. AI Analysis
The extracted text is combined with your other documents and analyzed by AI to create:
- Mind maps
- Study flow
- Organized sections
- Detailed explanations
- Practice quizzes

## Usage Instructions

### Upload PowerPoint Files

1. **Go to the home page** (http://localhost:3000)
2. **Enter your subject** (e.g., "Cell Biology")
3. **Click upload** and select your files:
   - Lecture notes (PDF)
   - Textbook chapters (DOCX)
   - **Lecture slides (PPTX)** ← NEW!
   - Study guides (TXT)
4. **Click "Start Learning"**

The app will process all files together!

### Example Workflow

Let's say you have:
- `lecture_notes.pdf` - Your handwritten notes
- `textbook_chapter3.docx` - Textbook material
- `professor_slides.pptx` - Lecture PowerPoint
- `study_guide.txt` - Summary notes

Upload **all of them together**, and the AI will:
1. Extract text from the PowerPoint slides
2. Combine with PDF, DOCX, and TXT content
3. Create a comprehensive study plan
4. Generate quizzes from ALL sources

## What Gets Extracted?

### ✅ Extracted
- Slide titles
- Bullet points and lists
- Text in text boxes
- Text in shapes
- Table content (text)
- Notes/speaker notes

### ❌ Not Extracted
- Images and photos
- Charts and diagrams (visual elements)
- Videos or animations
- Embedded objects

**Note**: While images aren't extracted, the AI will suggest visual aids based on the text content!

## Tips for Best Results

### 1. Use Text-Heavy Presentations
PowerPoints with lots of text work best:
- ✅ Lecture slides with bullet points
- ✅ Summary slides
- ✅ Definition slides
- ⚠️ Image-only slides (limited text extraction)

### 2. Combine with Other Materials
For comprehensive coverage:
- Upload PowerPoint for structure and key points
- Upload PDF/DOCX for detailed explanations
- Upload TXT for summaries

### 3. Clean Presentations Work Better
- Ensure slides aren't corrupted
- Avoid password-protected files
- Standard fonts work best

## File Size Limits

- **Maximum file size**: 50MB per file
- **Recommended**: Keep presentations under 20MB for faster processing
- **Tip**: Remove embedded videos/images to reduce size

## Troubleshooting

### PowerPoint File Won't Upload

**Problem**: File upload fails

**Solutions**:
1. Check file size (must be under 50MB)
2. Ensure file is `.ppt` or `.pptx`
3. Remove password protection
4. Try re-saving the file in PowerPoint
5. Check file isn't corrupted

### No Text Extracted

**Problem**: PowerPoint uploads but no content found

**Possible Causes**:
- Slides contain only images
- Text is embedded in images
- File is corrupted
- Unsupported format

**Solutions**:
1. Check if slides have actual text
2. Re-save presentation
3. Try exporting as PDF instead

### Partial Text Extraction

**Problem**: Some text missing

**Why**:
- Text in images isn't extracted
- Complex shapes may be skipped
- Some table cells might not parse

**Solution**:
- Add important text to slide notes
- Use simple text boxes
- Consider supplementing with PDF notes

## Technical Details

### Supported MIME Types
```
application/vnd.openxmlformats-officedocument.presentationml.presentation (.pptx)
application/vnd.ms-powerpoint (.ppt)
```

### Processing Library
Uses `pptx2json` to parse PowerPoint files and extract text content.

### Backend Processing
```javascript
// Automatically handles:
case '.pptx':
case '.ppt':
  return await this.parsePPTX(filePath);
```

## Examples

### Good PowerPoint for Upload
```
Slide 1: Cell Structure
- Cell membrane
- Cytoplasm
- Nucleus
- Mitochondria

Slide 2: Cell Membrane
- Phospholipid bilayer
- Selective permeability
- Transport mechanisms
```
✅ Text-rich, clear structure

### Less Ideal PowerPoint
```
Slide 1: [Large diagram of cell]
Slide 2: [Photo of microscope view]
Slide 3: [Video animation]
```
⚠️ Image-heavy, limited text

## FAQ

### Q: Can I upload multiple PowerPoint files?
**A**: Yes! Upload as many as you want (each under 50MB).

### Q: What if my slides have mostly images?
**A**: The AI will work with whatever text is available. Consider supplementing with text-based notes.

### Q: Will animations be preserved?
**A**: No, only text content is extracted. Animations and transitions are not included.

### Q: Can I upload old PPT files?
**A**: Yes! Both `.ppt` (older format) and `.pptx` (newer format) are supported.

### Q: What about slide notes?
**A**: Yes! Speaker notes are extracted if present.

### Q: Does it work with Google Slides?
**A**: Yes! Download your Google Slides as PowerPoint (.pptx) first, then upload.

## Best Practices

### 1. Combine File Types
```
✅ GOOD:
- lecture_slides.pptx (for structure)
- detailed_notes.pdf (for depth)
- summary.txt (for review)

⚠️ OKAY:
- only_slides.pptx (limited detail)
```

### 2. Check Content Before Upload
- Open PowerPoint to verify text is visible
- Ensure slides aren't empty
- Check for text in notes section

### 3. Organize by Topic
Upload files for the same exam together:
```
Human Anatomy Exam:
- ✅ skeletal_system.pptx
- ✅ muscular_system.pptx
- ✅ anatomy_textbook.pdf
- ✅ lab_notes.txt
```

## Migration from PDF

If you've been exporting PowerPoints as PDFs:

### Before (PDF Method)
1. Open PowerPoint
2. Export as PDF
3. Upload PDF
4. ⚠️ Formatting issues possible

### Now (Direct PPTX)
1. Just upload the PPTX directly!
2. ✅ Cleaner text extraction
3. ✅ Better structure preservation

## Support

### Need Help?
- Check [README.md](README.md) for general info
- See [QUICKSTART.md](QUICKSTART.md) for setup
- Review troubleshooting above

### File Not Working?
Try these steps:
1. Re-save in PowerPoint
2. Export as PDF instead
3. Copy text to TXT file
4. Check file isn't corrupted

---

**Happy studying with PowerPoint support! 📊🎓**
