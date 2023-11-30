export default function checkRegion(region, city) {
  if (region == city) {
    return region;
  } else if (!region || !city) {
    return null;
  }
  return `${region}, ${city}`;
  
}
