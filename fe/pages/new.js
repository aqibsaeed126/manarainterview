/* eslint-disable react/jsx-no-bind */
import React from 'react';


// await addCard({
//   user_id: 0,
//   due: '2022-05-30',
//   component: 'Landing Page',
//   task: 'New task item',
//   priority: 2,
// });

export async function getServerSideProps(context) {
    return { props: {} }
}

export default function NewCardForm() {
    let titleRef = useRef();
    let descriptionRef = useRef();

    function SubmitHandler(e) {
        e.preventDefault();

        let title = titleRef.current.value;
        let description = descriptionRef.current.value;
    }

  return (
      <>
        <h1>New Form for adding Card</h1>
        <form onSubmit={SubmitHandler}>
            <label>Title</label>
            <input type="text" ref={titleRef}/>

            <label>Description</label>
            <input type="text" ref={descriptionRef}/>

        </form>
      </>
  );
}
