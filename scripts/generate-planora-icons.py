"""Render Planora's SVG mark to the PNG and ICO sizes used by the app.

Run with: python scripts/generate-planora-icons.py
Requires Pillow. The matching vector source is public/favicon.svg.
"""

from pathlib import Path

from PIL import Image, ImageDraw


PUBLIC = Path(__file__).resolve().parents[1] / "public"
SCALE = 16
SIZE = 64 * SCALE


def point(x: float, y: float) -> tuple[int, int]:
    return round(x * SCALE), round(y * SCALE)


def cubic(start, control_a, control_b, end, steps=24):
    for index in range(1, steps + 1):
        t = index / steps
        u = 1 - t
        yield (
            u**3 * start[0]
            + 3 * u**2 * t * control_a[0]
            + 3 * u * t**2 * control_b[0]
            + t**3 * end[0],
            u**3 * start[1]
            + 3 * u**2 * t * control_a[1]
            + 3 * u * t**2 * control_b[1]
            + t**3 * end[1],
        )


image = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(image)
draw.rounded_rectangle((*point(2, 2), *point(62, 62)), radius=15 * SCALE, fill="#3030A8")

route = [(15, 49), (39, 49)]
route += list(cubic((39, 49), (43.5, 49), (46, 46), (46, 42)))
route += list(cubic((46, 42), (46, 38), (43.5, 35), (39, 35)))
route.append((24, 35))
route += list(cubic((24, 35), (19.5, 35), (17, 32), (17, 28)))
route += list(cubic((17, 28), (17, 24), (19.5, 21), (24, 21)))
route.append((46, 21))
draw.line([point(*p) for p in route], fill="white", width=round(5.5 * SCALE), joint="curve")


def circle(x, y, radius, color):
    draw.ellipse((*point(x - radius, y - radius), *point(x + radius, y + radius)), fill=color)


circle(15, 49, 4.5, "white")
circle(46, 21, 7, "white")
circle(46, 21, 3.5, "#FF786B")

for name, size in {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "apple-touch-icon.png": 180,
    "android-chrome-192x192.png": 192,
    "android-chrome-512x512.png": 512,
}.items():
    image.resize((size, size), Image.Resampling.LANCZOS).save(PUBLIC / name)

image.save(PUBLIC / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
