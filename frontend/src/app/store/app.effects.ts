import { AnswersEffects } from './answers/answers.effects';
import { EffectsModule } from '@ngrx/effects';
import { FormsEffects } from './forms/forms.effects';

export let appEffects = [
    FormsEffects,
    AnswersEffects
].map(EffectsModule.run);