# R2L video library

Videos are organized by website surface, so each part of the site can be changed without touching the others.

## Folders

- `landingpage/` - opening full-screen landing video.
- `wall-videos/` - the video grid/wall after the landing zoom-out.
- `leader-follower/` - method video for Leader - Follower.
- `remote-control/` - method video for Remote Control.
- `egocentric-data/` - method video for Egocentric Data.
- `simulator/` - method video for Simulator.

## Current website mapping

- Landing page: `landingpage/landing-01.mp4`
- Wall videos: `wall-videos/wall-01.mp4` through `wall-videos/wall-13.mp4`
- Leader - Follower: `leader-follower/leader-follower-01.mp4`
- Remote Control: `remote-control/remote-control-01.mp4`
- Egocentric Data: `egocentric-data/egocentric-data-01.mp4`
- Simulator: `simulator/simulator-01.mp4`

## Replacing videos

To change a video later, replace the file in the matching folder and keep the same filename. That way the website code does not need to change.

Examples:

- Replace the landing video with a new MP4 named `landing-01.mp4` inside `landingpage/`.
- Replace the Leader - Follower method video with a new MP4 named `leader-follower-01.mp4` inside `leader-follower/`.
- Replace wall footage by swapping files inside `wall-videos/`.

## Encoding

- MP4, H.264 is recommended.
- No audio is needed.
- Aspect ratio is preserved. The website uses `object-fit: cover`, so videos fill their frames without distortion.
