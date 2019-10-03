

$("#certificateModal").on("show.bs.modal", function(event){
    // Refrence the button that was clicked
    var button = $(event.relatedTarget);

    // Get certificate image
    var certificate = button.data("image");

    var modal = $(this);

    modal.find("img").attr("src", certificate);
})