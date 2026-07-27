/**
 * Entry point. Each behavior lives in its own module — no single init blob.
 * The fullscreen menu and header state belong to SiteHeader.astro.
 */
import { initReveal } from './reveal';
import { initPointerPreview } from './pointer-preview';
import { initStickyCapabilities } from './sticky-capabilities';
import { initLayeredCases } from './layered-cases';

initReveal();
initPointerPreview();
initStickyCapabilities();
initLayeredCases();
