import { ButtonGroup, Button } from '@mui/material';

function ZoomButton({ onZoomIn, onZoomOut }) {
  return (
    <div>
      <ButtonGroup sx={{ position:'fixed', display: 'inline', zIndex: 1, left: 1400, top: 15}} variant="contained" aria-label="outlined button group">
        <Button sx={{ fontWeight: 'bolder' }} onClick={onZoomIn}>+</Button>
        <Button sx={{ fontWeight: 'bolder' }} onClick={onZoomOut}>-</Button>
      </ButtonGroup>
    </div>
  );
}

export default ZoomButton;