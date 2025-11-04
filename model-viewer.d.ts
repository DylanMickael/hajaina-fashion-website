declare namespace JSX {
    interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        'camera-orbit'?: string;
        'rotation-per-second'?: string;
        'field-of-view'?: string;
        exposure?: string;
        'shadow-intensity'?: string;
        'animation-name'?: string;
        'animation-crossfade-duration'?: string;
        'autoplay'?: boolean;
        'shadow-softness'?: string;
        ar?: boolean;
        'ar-modes'?: string;
        'ar-scale'?: string;
        'ar-placement'?: string;
        'interaction-prompt'?: string;
        'interaction-prompt-style'?: string;
        'interaction-prompt-threshold'?: string;
        poster?: string;
        loading?: 'auto' | 'lazy' | 'eager';
        reveal?: 'auto' | 'interaction' | 'manual';
        'environment-image'?: string;
        skybox?: string;
        'min-camera-orbit'?: string;
        'max-camera-orbit'?: string;
        'min-field-of-view'?: string;
        'max-field-of-view'?: string;
        'orbit-sensitivity'?: string;
      },
      HTMLElement
    >;
  }
}