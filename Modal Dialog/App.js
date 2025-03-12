import { useState } from 'react';

import ModalDialog from './ModalDialog';

export default function App() {
  const [title, setTitle] = useState('Modal Dialog');
  const [openDialog,setOpenDialog] = useState(false);
  return (
    <>
    <button onClick={()=>setOpenDialog(true)}>Show Model</button>
    {openDialog && <div>
      <ModalDialog title={title} onClose={()=>setOpenDialog(false)}>
      <p>
        One morning, when Gregor Samsa woke from troubled
        dreams, he found himself transformed in his bed into
        a horrible vermin. He lay on his armour-like back,
        and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches
        into stiff sections.
        </p>
      </ModalDialog>
    </div>}
    </>
  );
}
