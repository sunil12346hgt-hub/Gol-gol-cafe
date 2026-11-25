app.use(express.static(__dirname, {
  index: false,
  dotfiles: "ignore"
}));
