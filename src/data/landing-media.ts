/**
 * Stable Unsplash CDN URLs (images.unsplash.com). Each ID is a distinct photo.
 * Params: width, quality, format for performance.
 */
const q = (photoId: string, w: number) =>
  `https://images.unsplash.com/${photoId}?w=${w}&q=80&auto=format&fit=crop`;

export const LANDING_IMAGES = {
  heroTeam: q('photo-1522071820081-009f0129c71c', 1600),
  featureWhiteboard: q('photo-1531403009284-440f170d8780', 900),
  featureAi: q('photo-1677442136019-21780ecad995', 900),
  featureNetwork: q('photo-1517245386807-bb43f82c33c4', 900),
  featureWorkspace: q('photo-1498050108023-c5249f4df085', 900),
  stepPost: q('photo-1486312338219-ce68d2c6f44d', 900),
  stepFeedback: q('photo-1551434678-e076c223a692', 900),
  stepLaunch: q('photo-1523240795612-9a054b0db644', 900),
  trendGreen: q('photo-1473341304170-971dccb5ac1e', 800),
  trendAi: q('photo-1620712943543-bcc4688e7485', 800),
  trendCreator: q('photo-1611162617474-5b21e879e113', 800),
  gallery1: q('photo-1504384308090-c894fdcc538d', 800),
  gallery2: q('photo-1540575467063-178a50c2df87', 800),
  gallery3: q('photo-1529156069898-49953e39b3ac', 800),
  gallery4: q('photo-1600880292203-757bb62b4baf', 800),
  gallery5: q('photo-1432888622747-4eb9a8f2c293', 800),
  gallery6: q('photo-1497366216548-37526070297c', 800),
  testimonial1: q('photo-1560250097-0b93528c311a', 200),
  testimonial2: q('photo-1573496359142-b8d87734a5a2', 200),
  testimonial3: q('photo-1472099645785-5658abf4ff4e', 200),
  testimonial4: q('photo-1519345182560-3f2917c472ef', 200),
  aboutTeam1: q('photo-1507003211169-0a1dd7228f2d', 400),
  aboutTeam2: q('photo-1580489944761-15a19d654956', 400),
  aboutTeam3: q('photo-1500648767791-00dcc994a43e', 400),
  aboutTeam4: q('photo-1438761681033-6461ffad8d80', 400),
  /** Full-bleed heroes for legal / company pages (low-opacity overlays in UI). */
  legalHeroAbout: q('photo-1522071820081-009f0129c71c', 1920),
  legalHeroPrivacy: q('photo-1563986768609-322da13575f3', 1920),
  legalHeroTerms: q('photo-1589829545856-d10d557cf95f', 1920),
  legalHeroContact: q('photo-1423666639041-f56000c27a9a', 1920),
} as const;
