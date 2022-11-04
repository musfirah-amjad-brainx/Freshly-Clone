  // step form   
  $(document).ready(function () {  
    // const form = $("#pageSteps");
    // form.steps({
    //     headerTag: "h3", bodyTag: "section", transitionEffect: "fade", titleTemplate: '<span class="step"></span> <span class="title">#title#</span>',
       
    // });
    $('#pageSteps').steps({
      stepSelector: '.step-steps > li',
      contentSelector: '.step-content > .step-tab-panel',
      footerSelector: '.step-footer',
      buttonSelector: 'button',
      activeClass: 'active',
      doneClass: 'done',
      errorClass: 'error'
    });
//     var mySteps = $('#pageSteps').steps();
// steps_api = steps.data('plugin_Steps');
});