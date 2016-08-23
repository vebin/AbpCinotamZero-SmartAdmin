﻿using Cinotam.AbpModuleZero.Tools.DatatablesJsModels.GenericTypes;
using Cinotam.ModuleZero.AppModule.AuditLogs.Dto;
using System.Threading.Tasks;

namespace Cinotam.ModuleZero.AppModule.AuditLogs
{
    public interface IAuditLogService
    {
        Task<AuditLogOutput> GetLatestAuditLogOutput();
        ReturnModel<AuditLogDto> GetAuditLogTable(RequestModel<object> input);
    }
}
