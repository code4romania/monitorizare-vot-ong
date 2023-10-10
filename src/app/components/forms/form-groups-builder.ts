import { FormBuilder, Validators } from '@angular/forms';


export function initFormFormGroup(formBuilder: FormBuilder) {
  return formBuilder.group({
    id: formBuilder.control(0),
    orderNumber: formBuilder.control(0),
    description: formBuilder.control(null, Validators.required),
    code: formBuilder.control(null, Validators.required),
    diaspora: formBuilder.control(false),
    formSections: formBuilder.array([], Validators.required)
  });
}

export function initSectionFormGroup(formBuilder: FormBuilder) {
  return formBuilder.group({
    id: formBuilder.control(0),
    orderNumber: formBuilder.control(0),
    questions: formBuilder.array([]),
    description: formBuilder.control(''),
    code: formBuilder.control('')
  });
}

export function initQuestionFormGroup(formBuilder: FormBuilder) {
  return formBuilder.group({
    id: formBuilder.control(0),
    orderNumber: formBuilder.control(0),
    optionsToQuestions: formBuilder.array([]),
    text: formBuilder.control(''),
    code: formBuilder.control(''),
    questionType: formBuilder.control(0)
  });
}

export function initOptionFormGroup(formBuilder: FormBuilder) {
  return formBuilder.group({
    id: formBuilder.control(0),
    orderNumber: formBuilder.control(0),
    optionId: formBuilder.control(0),
    text: formBuilder.control(''),
    isFreeText: formBuilder.control(false),
    flagged: formBuilder.control(false)
  });
}
