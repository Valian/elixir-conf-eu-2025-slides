const MyHook = {
  mounted() {
    this.el.addEventListener("click", () => {
      console.log("clicked");
    });
  },
  updated() {
    console.log("MyHook updated");
  },
  beforeUnmount() {
    console.log("MyHook beforeUnmount");
  },
};

export default MyHook;
