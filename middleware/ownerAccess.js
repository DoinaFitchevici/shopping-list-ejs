const ensureOwner = (Model) => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params.id);
      if (!resource) {
        req.flash("error", "Resource not found.");
        return res.redirect("/sessions/register");
      }
      if (resource.user.toString() !== req.user._id.toString()) {
        req.flash(
          "error",
          "You do not have permission to perform this action."
        );
        return res.redirect("/sessions/register");
      }
      next();
    } catch (error) {
      console.error("Error checking ownership:", error);
      req.flash("error", "An error occurred.");
      res.redirect("/sessions/register");
    }
  };
};

module.exports = ensureOwner;
