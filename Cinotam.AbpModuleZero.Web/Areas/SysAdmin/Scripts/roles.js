﻿/// <reference path="datatables.responsiveConfigs.js" />
/// <reference path="~/Areas/SysAdmin/Scripts/localizationText.js" />
(function () {
    "use strict";
    var table = $("#rolesTable").DataTable({
        "bServerSide": true,
        "bPaginate": true,
        "sPaginationType": "full_numbers", // And its type.
        "iDisplayLength": 10,
        "ajax": "/SysAdmin/Roles/" + "LoadRoles",
        "autoWidth": true,
        "preDrawCallback": function () {
            // Initialize the responsive datatables helper once.
            if (!responsiveHelper_dt_roles) {
                responsiveHelper_dt_roles = new ResponsiveDatatablesHelper($('#rolesTable'), breakpointDefinition);
            }
        },
        "rowCallback": function (nRow) {
            responsiveHelper_dt_roles.createExpandIcon(nRow);
        },
        "drawCallback": function (oSettings) {
            responsiveHelper_dt_roles.respond();
        },
        language: window.dataTablesLang,
        //dataSrc: 'result.data',
        columnDefs: [
            {
                "name": "CreationTime",
                "targets":"1"
            },
            {
                className: "text-center",
                "render": function (data, type, row) {
                    if (!row.IsStatic) {
                        return " <a data-modal href='/SysAdmin/Roles/CreateEditRole/" + row.Id + "' class='btn btn-default btn-xs' title='" + LSys("EditRole") + "' ><i class='fa fa-edit'></i></a>";
                    } else {
                        return " <a disabled class='btn btn-default btn-xs' title='"+LSys("EditRole")+"' ><i class='fa fa-edit'></i></a>";
                    }
                    
                },
                "targets": 2
            }
        ],
        columns: [

            {
                "data": "DisplayName"
            },
            { "data": "CreationTimeString" },
            { "data": "Id" }
        ]
    });



    document.addEventListener('modalClose', modalHandler);
    function modalHandler(event) {
        console.log(event);
        switch (event.detail.info.modalType) {
            case "MODAL_ROLES_SET":
                table.ajax.reload();
                abp.notify.success(LSys("RoleAssigned"), LSys("Success"));
                break;
            case "MODAL_ROLE_CREATED":
                table.ajax.reload();
                abp.notify.success(LSys("RoleEdited"), LSys("Success"));
                break;
            case "MODAL_ROLE_DELETED":
                table.ajax.reload();
                abp.notify.warn(LSys("RoleDeleted"), LSys("Success"));
                break;
            default:
                console.log("Event unhandled");
        }
    }

})();