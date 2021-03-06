﻿using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Modules;
using Abp.Zero;
using Abp.Zero.Configuration;
using Cinotam.AbpModuleZero.Authorization;
using Cinotam.AbpModuleZero.Authorization.Roles;
using Cinotam.AbpModuleZero.MultiTenancy;
using Cinotam.AbpModuleZero.Users;
using System;
using System.Reflection;

namespace Cinotam.AbpModuleZero
{
    [DependsOn(typeof(AbpZeroCoreModule))]
    public class AbpModuleZeroCoreModule : AbpModule
    {

        public override void PreInitialize()
        {
            Configuration.Auditing.IsEnabledForAnonymousUsers = true;

            //Declare entity types
            Configuration.Modules.Zero().EntityTypes.Tenant = typeof(Tenant);
            Configuration.Modules.Zero().EntityTypes.Role = typeof(Role);
            Configuration.Modules.Zero().EntityTypes.User = typeof(User);

            //Remove the following line to disable multi-tenancy.
            Configuration.MultiTenancy.IsEnabled = true;

            //Add/remove localization sources here
            Configuration.Localization.Sources.Add(
                new DictionaryBasedLocalizationSource(
                    AbpModuleZeroConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        Assembly.GetExecutingAssembly(),
                        "Cinotam.AbpModuleZero.Localization.SourceZero"
                        )
                    )
                );
            AppRoleConfig.Configure(Configuration.Modules.Zero().RoleManagement);

            Configuration.Authorization.Providers.Add<AbpModuleZeroAuthorizationProvider>();
            Configuration.Features.Providers.Add<AppFeatureProvider>();

            Configuration.Caching.Configure(AbpModuleZeroConsts.AttachmentsCacheName, cache =>
            {
                cache.DefaultSlidingExpireTime = TimeSpan.FromHours(1);
            });
            Configuration.Caching.Configure(AbpModuleZeroConsts.LocalizableContentCacheName, cache =>
            {
                cache.DefaultSlidingExpireTime = TimeSpan.FromHours(1);
            });

        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());




        }


    }
}
