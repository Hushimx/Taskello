import { Formik, Form, Field, FieldArray } from "formik";
import useGetId from "../../Hooks/useId";

export default function NewBoardModel({
  setBoards,
  closePopUp,
  socket,
  theme,
}) {
  const [newId] = useGetId();

  function createHandler() {}
  return (
    <div className={`model ${theme.current} tw-bg-boardBG`}>
      <Formik
        initialValues={{
          boardName: "",
          columns: [
            { _id: newId(), value: "ToDo" },
            { _id: newId(), value: "Doing" },
          ],
        }}
        onSubmit={async (val) => {
          const newBoard = {};
          if (val.boardName.length < 3) return 0;
          newBoard.title = val.boardName;
          newBoard.columns = [];

          for (let col of val.columns) {
            newBoard.columns.push({ id: newId(), title: col.value });
          }
          socket.emit("createBoard", newBoard);
          closePopUp();
        }}
      >
        {({ values, handleChange }) => {
          return (
            <Form>
              <label htmlFor="boardName" className=" tw-text-primColor">
                Board Name
              </label>
              <Field
                className="mainInput  tw-text-primColor"
                placeholder="BoardName"
                name="boardName"
                id="boardName"
                value={values.boardName}
                onChange={handleChange}
              />
              <p className=" tw-text-primColor">Columns</p>
              <FieldArray
                name="columns"
                render={({ push, remove }) => {
                  return (
                    <>
                      {values.columns.map((column, index) => {
                        return (
                          <div key={column.id}>
                            <Field
                              className="mainInput tw-me-2 tw-text-primColor"
                              name={`columns.${index}.value`}
                              placeholder="Jane Doe"
                            />
                            <button
                              className=" tw-text-primColor"
                              type="button"
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              X
                            </button>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        className=" tw-text-secColor"
                        onClick={() => {
                          push({ _id: newId(), value: "" });
                        }}
                      >
                        Add Columns
                      </button>
                      <button className="mainBtn" type="submit">
                        Create
                      </button>
                    </>
                  );
                }}
              ></FieldArray>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
