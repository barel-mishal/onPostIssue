import { component$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
        <button
        onClick$={async () => {
          await fetchPost();
        }}
        
        >post to posty</button>
        <a href="/posty">nevigate to posty</a>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};


export const onPost: RequestHandler = async (requestEvent) => { 
  const data = { notes: [{ id: "1", title: "Note 1", text: "This is note 1" }, { id: "2", title: "Note 2", text: "This is note 2" }] };
 data.notes = [...data.notes, { id: (data.notes.length + 1).toString(), title: "", text: "" }];
 throw requestEvent.redirect(302, `/posty/`);
}

export const factoryFetch = async (method: "DELETE" | "PUT" | "POST", id: string | undefined) => {
 const response = await fetch(`/`, {
   method: method,
   headers: {
     "Content-Type": "application/json",
   },
   redirect: "follow", // manual, *follow, error
   body: JSON.stringify({ id: id }),
 });
 return response
}

export const fetchPost = async () => {
 return factoryFetch("POST", undefined)
}