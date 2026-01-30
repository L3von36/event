from PIL import Image
import os

def create_favicon(input_path, output_path):
    img = Image.open(input_path)
    # Favicon typically includes multiple sizes: 16x16, 32x32, 48x48
    icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    img.save(output_path, format='ICO', sizes=icon_sizes)

if __name__ == "__main__":
    logo_path = r"c:\Users\new\Documents\event\public\logo.png"
    favicon_path = r"c:\Users\new\Documents\event\app\favicon.ico"
    create_favicon(logo_path, favicon_path)
    print("Favicon updated successfully with new logo.")
