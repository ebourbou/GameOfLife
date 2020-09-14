
export function enumSelector(definition) {
  return Object.keys(definition)
    .map(key => ({ value: definition[key], title: key }));
}
