import Button from "../../SharedModule/components/UI/Buttons";
import { Input, SelectInput, Textarea, DetailsInput } from "../../SharedModule/components/UI/Inputs";
import { AddModel, DeleteModel, DetailsModel, EditModel } from "../../SharedModule/components/Modals";
import { useCreateQuestionMutation, useDeleteQuestionMutation, useEditQuestionMutation, useQuestionDetailsQuery } from "../../../redux/Questions/questionSlice";
import { RightAnswers } from '../../../Types/types';
import { Answers, difficulty, type } from "../../../utils/VariablesQS";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface IEditQuestion {
  answer: typeof RightAnswers;
}
interface ICreateQuestions {
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: typeof RightAnswers;
  difficulty: string;
  type: string;
}
const validationSchema = Yup.object().shape({
  title: Yup.string().required('This Field is required'),
  description: Yup.string().required('This Field is required'),
  options: Yup.object().shape({
    A: Yup.string().required('This Field is required'),
    B: Yup.string().required('This Field is required'),
    C: Yup.string().required('This Field is required'),
    D: Yup.string().required('This Field is required'),
  }),
  answer: Yup.string().required('This Field is required'),
  difficulty: Yup.string().required('This Field is required'),
  type: Yup.string().required('This Field is required'),
});

interface IAddQuestionsProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const CreateQuestionModal = ({ closeModal, isOpen }: IAddQuestionsProps) => {
  const [submitCreateQuestion, { isLoading: createLoading }] = useCreateQuestionMutation();

  const handleCreateQuestion = async (values: ICreateQuestions, { resetForm }: any) => {
    const response = await submitCreateQuestion(values);
    if ('data' in response && response.data.message === "Record created successfully") {
      resetForm();
      closeModal();
    }
  };

  return (
    <AddModel title="Set up a new Question" {...{ isOpen, closeModal }}>
      <Formik
        initialValues={{
          title: '',
          description: '',
          options: {
            A: '',
            B: '',
            C: '',
            D: '',
          },
          answer: '',
          difficulty: '',
          type: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleCreateQuestion}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="title" as={Input} label="Title" />
            <ErrorMessage name="title" component="div" className="text-red-600 block mb-1" />

            <Field name="description" as={Textarea} label="Description" />
            <ErrorMessage name="description" component="div" className="text-red-600 block mb-1" />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className='w-full '>
                <Field name="options.A" as={Input} label="A" />
                <ErrorMessage name="options.A" component="div" className="text-red-600 block mb-1" />
              </div>

              <div className='w-full'>
                <Field name="options.B" as={Input} label="B" />
                <ErrorMessage name="options.B" component="div" className="text-red-600 block mb-1" />
              </div>

              <div className='w-full'>
                <Field name="options.C" as={Input} label="C" />
                <ErrorMessage name="options.C" component="div" className="text-red-600 block mb-1" />
              </div>

              <div className='w-full'>
                <Field name="options.D" as={Input} label="D" />
                <ErrorMessage name="options.D" component="div" className="text-red-600 block mb-1" />
              </div>
            </div>

            <div className="flex flex-col items-center justify-between sm:flex-row sm:gap-4">
              <div className='w-full'>
                <Field name="answer" as={SelectInput} label=" Answer" list={Answers} />
                <ErrorMessage name="answer" component="div" className="text-red-600 block mb-1" />
              </div>
              <div className='w-full'>
                <Field name="difficulty" as={SelectInput} label="difficulty" list={difficulty} />
                <ErrorMessage name="difficulty" component="div" className="text-red-600 block mb-1" />
              </div>
              <div className='w-full'>
                <Field name="type" as={SelectInput} label="type" list={type} />
                <ErrorMessage name="type" component="div" className="text-red-600 block mb-1" />
              </div>
            </div>

            <div className="flex justify-center">
              <Button isLoading={isSubmitting || createLoading} rounded={'lg'} className='gap-2 mt-4' variant={"ghost"}>Create Question</Button>
            </div>
          </Form>
        )}
      </Formik>
    </AddModel>
  );
};

interface IDeleteQuestionProps {
  isOpenDeleteModel: boolean;
  closeModalDelete: () => void;
  deleteItemId: string;
}

export const DeleteQuestionModal = ({ isOpenDeleteModel, closeModalDelete, deleteItemId }: IDeleteQuestionProps) => {
  const [submitDeleteQuestion, { isLoading: deleteLoading }] = useDeleteQuestionMutation();

  const handleDeleteQuiz = async () => {
    const response = await submitDeleteQuestion(deleteItemId);
    if ('data' in response && response.data.message === "Record deleted successfully") {
      closeModalDelete();
    }
  };

  return (
    <DeleteModel {...{ isOpenDeleteModel, closeModalDelete }}>
      <form onSubmit={handleDeleteQuiz}>
        <span className='text-xl font-extrabold'>Confirm Delete</span>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this Question ?
        </p>
        <div className='flex justify-between mt-4'>
          <Button onClick={closeModalDelete} rounded={'lg'} type='button' >Cancel</Button>
          <Button isLoading={deleteLoading} rounded={'lg'} type='submit' variant={"destructive"}>Delete</Button>
        </div>
      </form>
    </DeleteModel>
  );
};

interface IEditQuestionProps {
  isOpenEditModel: boolean;
  closeModalEdit: () => void;
  editItemId: string;
  rightAnswer: typeof RightAnswers;
}

export const EditQuestionModal = ({ isOpenEditModel, closeModalEdit, editItemId, rightAnswer }: IEditQuestionProps) => {
  const [submitEditQuestion, { isLoading: editLoading }] = useEditQuestionMutation();

  const handleEditQuestion = async (values: IEditQuestion) => {
    const response = await submitEditQuestion({ ...values, editItemId });
    if ('data' in response && response.data.message === "Record updated successfully") {
      closeModalEdit();
    }
  };

  return (
    <EditModel title="Update Question Title" {...{ isOpenEditModel, closeModalEdit }}>
      <Formik
        initialValues={{ answer: rightAnswer }}
        validationSchema={Yup.object().shape({
          answer: Yup.string().required('This Field is required'),
        })}
        onSubmit={handleEditQuestion}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="answer" as={SelectInput} label="RightAnswer" list={Answers} />
            <ErrorMessage name="answer" component="div" className="text-red-600 block mb-1" />
            <div className="flex justify-center">
              <Button isLoading={isSubmitting || editLoading} rounded={'lg'} variant={"ghost"} className="mt-4">Edit Question</Button>
            </div>
          </Form>
        )}
      </Formik>
    </EditModel>
  );
};

interface IDetailsQuestionsProps {
  isOpenDetailsModel: boolean;
  closeDetailsModel: () => void;
  detailsItemId: string;
}

export const DetailsQuestionModal = ({ closeDetailsModel, isOpenDetailsModel, detailsItemId }: IDetailsQuestionsProps) => {
  const { data: questionDetails, status } = useQuestionDetailsQuery(detailsItemId);

  return (
    <DetailsModel title="Question Details" {...{ isOpenDetailsModel, closeDetailsModel }}>
      {status === "fulfilled" ? (
        <>
          <DetailsInput label="Title" content={`${questionDetails?.title}`} />
          <DetailsInput className="mt-4" label="Description" content={`${questionDetails?.description}`} />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className='w-full'>
              <DetailsInput label="A" content={`${questionDetails?.options?.A}`} />
            </div>
            <div className='w-full'>
              <DetailsInput label="B" content={`${questionDetails?.options?.B}`} />
            </div>
            <div className='w-full'>
              <DetailsInput label="C" content={`${questionDetails?.options?.C}`} />
            </div>
            <div className='w-full'>
              <DetailsInput label="D" content={`${questionDetails?.options?.D}`} />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 mt-4 sm:flex-row sm:gap-4 ">
            <div className='w-full'>
              <DetailsInput label="answer" content={`${questionDetails?.answer}`} />
            </div>
            <div className='w-full'>
              <DetailsInput label="type" content={`${questionDetails?.type}`} />
            </div>
            <div className='w-full'>
              <DetailsInput label="difficulty" content={`${questionDetails?.difficulty}`} />
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={closeDetailsModel} rounded={'lg'} className='gap-2 mt-4' variant={"ghost"}>Cancel</Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin" size={100} color="#C5D86D" />
        </div>
      )}
    </DetailsModel>
  );
};
