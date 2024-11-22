export const isValidART = (art) => {
  const regex = /^(TI-)?[A-Za-z]+(\/[A-Za-z]+)+\/\d+$/;
  return regex?.test(art);
};

export const extractState = (art) => {
  const regex = /^(?:TI-)?([A-Za-z]+)/;
  const match = art.match(regex);
  return match ? match[1] : null;
};

export const extractFacility = (art) => {
  const regex = /^(?:TI-)?[A-Za-z]+\/([A-Za-z]+)/;
  const match = art.match(regex);
  return match ? match[1] : null;
};


export const extractCode = (art) => {
  const regex = /^(?:TI-)?([A-Za-z]+\/)([A-Za-z]+\/)/; // Capture the first and second bits with their slashes
  const match = art.match(regex);
  return match ? match[1] + match[2] : null;
}
