declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module 'leaflet' {
  import * as L from 'leaflet'
  export = L
}

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      src: string;
      alt: string;
      'camera-controls'?: boolean;
      'auto-rotate'?: boolean;
      'rotation-speed'?: string;
      ar?: boolean;
      style?: React.CSSProperties;
    }, HTMLElement>;
  }
}