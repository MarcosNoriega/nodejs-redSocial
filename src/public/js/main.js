$(document).ready(() => {
    moment.locale('es'); 
    $("#comentar").hide();

    $(".tiempo").each(function() {
        var time = moment($(this).text()).fromNow();
        $(this).text(time);
    });

    $("#btn-toggle-comentarios").click(function(){
        $("#comentar").slideToggle();
    });

    $("#btn-like").click(function(e){
        e.preventDefault();
        var id = $(this).data('id');
        

        $.ajax({
            url: `/image/${id}/like`,
            type: "POST",
            success: function(res){
                $(".likes-count").text(res.likes);
            }
        });
    });

    $("#btn-borrar").click(function(e){
        e.preventDefault();
        confirm("¿Estas seguro de que quieres eliminar?");
        var id = $(this).data('id');


        $.ajax({
            url: `/imagen/delate/${id}`,
            type: 'DELETE',
            success: function(res){
                $("#btn-borrar").removeClass('btn-danger').addClass('btn-success').text("Borrado Correctamente");
                $("#icon-borrar").removeClass('fa-trash-alt').addClass('fa-check');
            }
        });
    })
    
});