import { useActionState, useId } from 'react';
import z from 'zod';
import style from './TaskForm.module.css';

// Schema de validation du formulaire (Zod)
const taskSchema = z.object({
  name: z.string()
    .min(3, { error: 'Le nom doit contenir minimum 3 caracteres' }),
  desc: z.string()
    .nullable(),
  priority: z.enum(['low', 'normal', 'urgent'], { error: 'Veuillez choisir une des options de priorité' })
});

// Typage des données du formulaire (Généré via Zod)
export type TaskData = z.infer<typeof taskSchema>;


// Composant
type TaskFormProps = {
  btnValidation?: string,
  onTaskSubmit: (data: TaskData) => void;
};
type TaskFormActionState = {
  formData: FormData | null,
  error: {
    name?: string[];
    desc?: string[];
    priority?: string[];
  } | null;
};
export default function TaskForm({
  btnValidation = 'Valider',
  onTaskSubmit
}: TaskFormProps) {

  // Identifiant d'accessibilité
  const inputId = useId();

  // Action du formulaire
  const taskAction = async (state: TaskFormActionState, formData: FormData) => {

    // Validation des données en utilisant le schema zod
    const { data, error, success } = taskSchema.safeParse(Object.fromEntries(formData.entries()));

    // Gestion d'erreur
    if (!success) {
      return {
        formData,
        error: z.flattenError(error).fieldErrors
      };
    }

    // Validation
    onTaskSubmit(data);

    return {
      formData: null,
      error: null
    };
  };

  // State 
  const [state, handleSubmit] = useActionState(taskAction, { formData: null, error: null });

  // Rendu
  return (
    <form action={handleSubmit} className={style['task-form']}>
      <div>
        <label htmlFor={inputId + 'name'}>Nom : </label>
        <input id={inputId + 'name'} type='text' name='name' defaultValue={state.formData?.get('name')?.toString()} />
        {state.error?.name && (
          <span>{state.error.name.join(', ')}</span>
        )}
      </div>
      <div>
        <label htmlFor={inputId + 'desc'}>Description : </label>
        <textarea id={inputId + 'desc'} name='desc' defaultValue={state.formData?.get('desc')?.toString()} />
        {state.error?.desc && (
          <span>{state.error.desc.join(', ')}</span>
        )}
      </div>
      <div>
        <label htmlFor={inputId + 'priority'}>Priorité : </label>
        <select id={inputId + 'priority'} name='priority'
          key={'key' + inputId + state.formData?.get('priority')?.toString()}
          defaultValue={state.formData?.get('priority')?.toString()}>
          <option value='' hidden>Veuillez selectionner une priorité</option>
          <option value='low'>Basse</option>
          <option value='normal'>Normal</option>
          <option value='urgent'>Urgent</option>
        </select>
        {state.error?.priority && (
          <span>{state.error.priority.join(', ')}</span>
        )}
      </div>
      <div>
        <button type='submit'>{btnValidation}</button>
      </div>
    </form>
  );
}