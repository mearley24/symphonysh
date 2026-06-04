import json, sys

SRC = sys.argv[1]
d = json.load(open(SRC))
p = d['pages']['2']  # main level
rooms_raw = p['rooms']
placed = p['placed']

# Bounding box from room polygons (frame the whole house incl. deck)
xs, ys = [], []
for r in rooms_raw:
    for pt in r['points']:
        xs.append(pt['x']); ys.append(pt['y'])
minx, maxx = min(xs), max(xs)
miny, maxy = min(ys), max(ys)
W, H = maxx - minx, maxy - miny

PAD = 26
TARGET_W = 720
scale = (TARGET_W - 2*PAD) / W
VBW = TARGET_W
VBH = round(H * scale + 2*PAD)

def nx(x): return round((x - minx) * scale + PAD, 1)
def ny(y): return round((y - miny) * scale + PAD, 1)

# Map raw device types -> demo categories
CAT = {
 'keypad':'keypad', 'configurable-keypad(no-load)':'keypad',
 'tv':'tv',
 '1-channel':'speaker','5.1':'speaker','7-channel':'speaker','9-channel':'speaker','11-channel':'speaker',
 'center':'speaker','subwoofer':'speaker','dual-voice-coil':'speaker','70-volt':'speaker','100-volt':'speaker',
 'shade':'shade','shade-power':'shade',
 'recessed-door/window-sensor':'contact','mini-door/window-sensor':'contact',
 'glassbreak':'glassbreak','motion-sensor':'motion',
 'smoke/co':'safety','carbon-monoxide-detector':'safety','heat':'safety','high/low-temp':'safety','smoke/co-combo-device':'safety',
 'water':'water',
 'core-3':'panel','clare-controls-clr-c1-pnl1':'panel','lighting-panel':'panel',
 'clare-auxiliary-touch-panel':'touchpanel',
 'dome-camera':'camera','bullet-camera':'camera','360-camera':'camera','doorbell':'doorbell',
}

rooms = []
for r in rooms_raw:
    pts = [[nx(pt['x']), ny(pt['y'])] for pt in r['points']]
    rooms.append({'name': r['name'], 'pts': pts,
                  'lx': nx(r['labelX']), 'ly': ny(r['labelY'])})

# point-in-polygon to tag each device with its room
def pip(x, y, poly):
    inside = False
    n = len(poly); j = n-1
    for i in range(n):
        xi, yi = poly[i]; xj, yj = poly[j]
        if ((yi > y) != (yj > y)) and (x < (xj-xi)*(y-yi)/(yj-yi+1e-9)+xi):
            inside = not inside
        j = i
    return inside

devices = []
for dv in placed:
    cat = CAT.get(dv['type'])
    if not cat: continue
    x, y = nx(dv['x']), ny(dv['y'])
    room = None
    for r in rooms:
        if pip(x, y, r['pts']): room = r['name']; break
    devices.append({'cat':cat,'x':x,'y':y,'room':room})

out = {'viewBox':[VBW,VBH], 'rooms':rooms, 'devices':devices}
print(json.dumps(out))
