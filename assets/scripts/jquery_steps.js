  // step form   
  $(document).ready(function () {  
    const form = $("#pageSteps");
    form.steps({
        headerTag: "h3", bodyTag: "section", transitionEffect: "fade", titleTemplate: '<span class="step"></span> <span class="title">#title#</span>',
       
    });
});