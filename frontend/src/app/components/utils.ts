import {FormArray} from '@angular/forms';

export function moveItemInFormArray(source: FormArray, from: number, to: number) {
  const dir = to > from ? 1 : -1;

  const temp = source.at(from);
  for (let i = from; i * dir < to * dir; i = i + dir) {
    const current = source.at(i + dir);
    source.setControl(i, current);
  }
  source.setControl(to, temp);
}
