import addTodo from "@/server/actions/add-todo";

async function getData() {
  const res = await fetch(`${process.env.API_URL}/todo`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

type Todo = {
  id: string;
  name: string;
};

export default async function Home() {
  const data: Todo[] = await getData();

  return (
    <main className='flex gap-2 my-16 flex-col items-center justify-between'>
      <h1>Server Action Todo List</h1>
      <form action={addTodo} className='my-4'>
        <input
          className='py-2 px-4 text-black rounded-sm'
          type='text'
          name='name'
          placeholder='name'
        />
        <button
          type='submit'
          className='mx-2 rounded-sm bg-slate-800 text-white py-2 px-4
        '
        >
          Add
        </button>
      </form>

      <ul className='flex flex-col gap-2 my-4 items-center'>
        {data.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </main>
  );
}
