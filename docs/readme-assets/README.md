# README Demo Assets

These screenshots are public README assets, captured from an isolated Token
Arcade demo instance on 2026-07-10. They contain fictional project names and
synthetic token values only; they are not PM visual-audit evidence.

## README Media

Every screenshot and recording in this directory must use the isolated
fictional demo slot. Never capture local usage history or real project names.

Regenerate the short product-loop recording with a local server running:

```bash
URL=http://127.0.0.1:4173/?demo=1 npm run capture:readme
```

Convert the captured frames to the compact README GIF:

```bash
ffmpeg -y -framerate 10 \
  -i /tmp/token-arcade-readme-capture/frames/frame-%04d.png \
  -vf "scale=800:-1:flags=neighbor,split[s0][s1];[s0]palettegen=max_colors=128:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" \
  docs/readme-assets/token-arcade-demo.gif
```
