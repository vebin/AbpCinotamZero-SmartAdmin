﻿(function () {
    var modalType = "MODAL_USER_CREATED";
    $(document)
        .ready(function () {
            var $form = $("#createEditForm");
            
            $form.on("submit", function (e) {
                var sendNotificationMail = $("#SendNotificationMail");
                var isTwoFactorEnabled = $("#IsTwoFactorEnabled");
                var isActive = $("#IsActive");
                var shouldChangePasswordOnLogin = $("#ShouldChangePasswordOnLogin");
                var isEmailConfirmed = $("#IsEmailConfirmed");
                var self = this;
                e.preventDefault();
                var url = $(self).attr("action");
                var data = $(self).serializeFormToObject();
                data.IsActive = isActive.is(":checked");
                data.ShouldChangePasswordOnLogin = shouldChangePasswordOnLogin.is(":checked");
                data.SendNotificationMail = sendNotificationMail.is(":checked");
                data.IsTwoFactorEnabled = isTwoFactorEnabled.is(":checked");
                data.IsEmailConfirmed = isEmailConfirmed.is(":checked");
                abp.ui.setBusy($form, abp.ajax({
                    url: url,
                    data: JSON.stringify(data)
                }).done(function () {
                    window.modalInstance.close({}, modalType);
                }));
            });
        });
})();