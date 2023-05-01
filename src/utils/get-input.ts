export function getInputByFormElement(formEl: HTMLFormElement, name: string) {
  return formEl.querySelector<HTMLInputElement>(`[name="${name}"]`)!.value;
}
