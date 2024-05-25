'use client';

import * as React from 'react';
import Reveal from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import RevealZoom from 'reveal.js/plugin/zoom/zoom';

import 'reveal.js/dist/reset.css';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
import './style.css';

export interface MassSlidesProps {
  liturgicalYear: string;
  name: string;
}

export default function MassSlides(props: MassSlidesProps) {
  const deckDivRef = React.useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = React.useRef<Reveal.Api | null>(null); // reference to deck reveal instance
  React.useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) {
      return;
    }
    deckRef.current = new Reveal(deckDivRef.current!, {
      transition: 'convex',
      controls: true,
      progress: true,
      history: true,
      center: true,
      width: 1200,
      height: 700,
      plugins: [RevealMarkdown, RevealZoom],
    });
    deckRef.current.initialize().then(() => {
      // Good place for event handlers and plugin setups
    });
    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        // Reveal.js destroy call failed.
      }
    };
  }, []);
  const { liturgicalYear, name } = props;
  const markdown = `https://assets.holymass.app/masses/${liturgicalYear}/${name}.md`;
  return (
    <div className="reveal" ref={deckDivRef}>
      <div className="slides">
        <section data-markdown={markdown}></section>
      </div>
    </div>
  );
}
