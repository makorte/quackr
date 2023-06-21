export const openCreatePostForm = () => {
  let dialog: HTMLElement | null = document.getElementById("create-post-dialog");
  if (dialog) {
    (<HTMLDialogElement>dialog).showModal();
  }
}
