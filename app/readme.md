The app is a study case project from the Scrimba front end career path and it is handed partially complete without implementation of the features listed below:

1. lack of localStorage to save updates locally
2. refactored note list where updated notes show up to the top list
3. summary title for each note
4. delete functionality to delete notes

I need to install a few dependencies before to start:

1. Nano ID: a unique string ID generator for JS
2. React-Split: a tool to divide a section into areas that can be dragged to adjust width or height
3. React-Showdown: tool to render markdown as Components and components inside the markdown
4. React-mde: a markdown editor for JSX. At the time of writing, React 18 did not support mde yet; thus I had to import a specific link in the Editor component and install react-mde as per following: https://stackoverflow.com/questions/73077186/react-mde-cant-install-on-react-18-2-0

The scope:

The purpose of the app is to render a Note app whith some basic CRUD functionalities. The user can access the app without authentication, from there create, update and delete a Note; which is possible to store in localStorage as experimental stage. Later it will be pushed in a Firebase DB.
Thus; the focus is on CRUD functionalities, localStorage, and a few extra functionalities.

The logic:

1. STATE & INITIALISATION: 
Two different states are defined in the App component; one to check if there are any notes stored in the browser's local storage, and if there are, it loads those notes otherwise it initialise an empty notes array to host new notes. The second state keeps the track of the current note's ID.

2. EFFECTS: since the app deals with localStorage, and later on with Firebase DB, the hook useEffect has been called to duty handling the side effect whenever the notes array changes. It takes two arguments; a callback function to store the notes array to localStorage, and an array of dependancies, notes (state).

3. CREATE: the function to create a note is straightforward; it creates a new object with two properties, an ID generated bu the nanoid function, and a body with the text written by the user.
The creation of a new object in the notes list requires to update the state; thus, the notes setter take the previous state and update it adding the newNote object to the beginning of the notes array. Likewise, the ID setter takes the id of the new object and update the currentNoteId state.

4. UPDATE: the setter function starts by checking the previous state and creating an updated object for the selected note, thus the object comes with an existing ID (id: currentNoteId), and a body to be updated with a text argument.
Then, the setter creates a new version of the note with the updated text, adds it to the beginning of the list, and removes the old version of the note with the same ID. In other words, .filter() creates a new array and render it without the previous version of the note.
Finally, the new array is returned to set the state with the modified notes.

5. DELETE: the delete function takes two paramenters, an event and noteId. It starts deploying the stopPropagation method to stop the click event from bubbling up when selecting notes; then the setter function update the previous list of notes and it creates a new list of notes by filtering out the note with the specified ID (noteId). the .filter() method checks each note's id and keeps the notes that don't match with the noteId, returning a new array.