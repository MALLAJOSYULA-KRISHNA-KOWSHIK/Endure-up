import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  span: string;
}

const GalleryAdmin = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [formData, setFormData] = useState({ src: "", alt: "", span: "" });
  const [previewSrc, setPreviewSrc] = useState("");

  useEffect(() => {
    // Load gallery from localStorage
    const saved = localStorage.getItem("galleryImages");
    if (saved) {
      setImages(JSON.parse(saved));
    }
  }, []);

  const saveToLocalStorage = (updatedImages: GalleryImage[]) => {
    localStorage.setItem("galleryImages", JSON.stringify(updatedImages));
    setImages(updatedImages);
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.src || !formData.alt) {
      alert("Please fill in the image URL and alt text");
      return;
    }

    const newImage: GalleryImage = {
      id: Date.now().toString(),
      src: formData.src,
      alt: formData.alt,
      span: formData.span || "",
    };

    saveToLocalStorage([...images, newImage]);
    setFormData({ src: "", alt: "", span: "" });
    setPreviewSrc("");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      saveToLocalStorage(images.filter((img) => img.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Add Gallery Image</h2>
        <form onSubmit={handleAddImage} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Image URL</label>
            <input
              type="text"
              value={formData.src}
              onChange={(e) => {
                setFormData({ ...formData, src: e.target.value });
                setPreviewSrc(e.target.value);
              }}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-background border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Alt Text</label>
            <input
              type="text"
              value={formData.alt}
              onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
              placeholder="Describe the image"
              className="w-full bg-background border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Span Class (Optional)</label>
            <select
              value={formData.span}
              onChange={(e) => setFormData({ ...formData, span: e.target.value })}
              className="w-full bg-background border border-border px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            >
              <option value="">Normal (1x1)</option>
              <option value="md:row-span-2">Tall (2x height)</option>
              <option value="md:col-span-2">Wide (2x width)</option>
            </select>
          </div>

          {previewSrc && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Preview:</p>
              <img
                src={previewSrc}
                alt="preview"
                className="w-full max-h-48 object-cover rounded border border-border"
                onError={() => setPreviewSrc("")}
              />
            </div>
          )}

          <Button type="submit" className="w-full btn-primary-endure-up">
            <Plus className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Gallery Images</h2>
        {images.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No gallery images yet. Add one above!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image) => (
              <div key={image.id} className="bg-background border border-border rounded overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23333' width='100' height='100'/%3E%3C/svg%3E";
                  }}
                />
                <div className="p-4 space-y-2">
                  <p className="font-semibold text-foreground text-sm">{image.alt}</p>
                  <p className="text-xs text-muted-foreground truncate">{image.src}</p>
                  {image.span && <p className="text-xs text-primary">{image.span}</p>}
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="w-full mt-3 px-3 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryAdmin;
