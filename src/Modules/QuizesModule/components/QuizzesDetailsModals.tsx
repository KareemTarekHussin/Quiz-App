import  Button  from "../../SharedModule/components/UI/Buttons"
import { Input } from "../../SharedModule/components/UI/Inputs"
import { DeleteModel, EditModel } from "../../SharedModule/components/Modals"
import { useDeleteQuizMutation, useEditQuizMutation } from "../../../redux/Quizzes/quizzesSlice"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const required = "This Field is required";
const FieldValidation = {
  required,
}
const renderErrors = (errors: string | undefined) => {
    return errors ? (
      <span className="text-red-600 block mb-1">
        {errors}
      </span>
    ) : null;
  };

interface IDeleteQuizProps {
  isOpenDeleteModel: boolean
  closeModalDelete: () => void
  deleteItemId: string
}
interface IEditQuiz {
    title: string,
  }
export const DeleteQuizModal = ({ isOpenDeleteModel, closeModalDelete, deleteItemId }: IDeleteQuizProps) => {

  const { handleSubmit: handleSubmitDelete } = useForm()
  const navigate = useNavigate()
  const [submitDeleteQuiz, { isLoading: deleteLoading }] = useDeleteQuizMutation()

  const handleDeleteQuiz = async () => {
    const response = await submitDeleteQuiz(deleteItemId)
    if ('data' in response && response.data.message === "Record deleted successfully") {
      closeModalDelete()
      navigate('/dashboard/quiz')
    }
  }

  return <>
    <DeleteModel {...{ isOpenDeleteModel, closeModalDelete }}>
      <form onSubmit={handleSubmitDelete(handleDeleteQuiz)}>
        <span className='text-xl font-extrabold'>Confirm Delete</span>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this Quiz ?
        </p>
        <div className='flex justify-between mt-4'>
          <Button onClick={closeModalDelete} rounded={'lg'} type='button' >Cancel</Button>
          <Button isLoading={deleteLoading} rounded={'lg'} type='submit' variant={"destructive"}>Delete</Button>
        </div>
      </form>
    </DeleteModel>
  </>
}

interface IEditQuizProps {
  isOpenEditModel: boolean
  closeModalEdit: () => void
  refetch: () => void
  editItemId: string
  quizTitle: string
}

export const EditQuizModal = ({ isOpenEditModel, closeModalEdit, editItemId, quizTitle, refetch }: IEditQuizProps) => {

  const { handleSubmit, register, formState: { errors } } = useForm<IEditQuiz>()
  const [submitEditQuiz, { isLoading: editLoading }] = useEditQuizMutation()

  const handleEditQuiz = async (data: IEditQuiz) => {
    const response = await submitEditQuiz({ ...data, editItemId })
    if ('data' in response && response.data.message === "Record updated successfully") {
      refetch()
      closeModalEdit()
    }
  }
  
  return <>
    <EditModel title="Update Quiz Title"  {...{ isOpenEditModel, closeModalEdit }}>
      <form onSubmit={handleSubmit(handleEditQuiz)} className="mt-4">
        <Input label="Title" {...register("title", FieldValidation)} defaultValue={quizTitle} />
        {renderErrors(errors?.title?.message)}
        <div className="flex justify-center">
          <Button isLoading={editLoading} rounded={'lg'} variant={"ghost"} className="mt-4" >Edit Quiz</Button>
        </div>
      </form>
    </EditModel>
  </>
}