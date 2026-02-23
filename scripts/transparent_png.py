from PIL import Image
import sys

def make_white_transparent(img_path, out_path):
    img = Image.open(img_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # If the pixel is close to white, make it transparent
        # R, G, B > 200
        if item[0] > 200 and item[1] > 200 and item[2] > 200:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(out_path, "PNG")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        make_white_transparent(sys.argv[1], sys.argv[2])
