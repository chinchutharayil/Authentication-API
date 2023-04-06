﻿global using HealthChecks.UI.Client;
global using Identity.API.Data;
global using Identity.API.Domain.AppSettings;
global using Identity.API.Domain.Common;
global using Identity.API.Domain.Entity;
global using Identity.API.Domain.Entity.Models;
global using Identity.API.Domain.Entity.Models.Interfaces;
global using Identity.API.Domain.Enum;
global using Identity.API.Exceptions;
global using Identity.API.Filters.DTOValidation;
global using Identity.API.Infrastructure;
global using Identity.API.Infrastructure.Interfaces;
global using Identity.API.ServiceRegistration;
global using Identity.API.Services.Contracts;
global using Identity.API.Services.Implementations;
global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using Microsoft.AspNetCore.Diagnostics.HealthChecks;
global using Microsoft.AspNetCore.Identity;
global using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.AspNetCore.Mvc.Filters;
global using Microsoft.AspNetCore.WebUtilities;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.Extensions.Diagnostics.HealthChecks;
global using Microsoft.Extensions.Options;
global using Microsoft.IdentityModel.Tokens;
global using Microsoft.OpenApi.Models;
global using Serilog;
global using Serilog.Sinks.SystemConsole.Themes;
global using System;
global using System.ComponentModel.DataAnnotations;
global using System.Globalization;
global using System.IdentityModel.Tokens.Jwt;
global using System.Linq.Expressions;
global using System.Net;
global using System.Net.Sockets;
global using System.Reflection;
global using System.Security.Claims;
global using System.Security.Cryptography;
global using System.Text;
global using System.Text.Json;
global using System.Text.Json.Serialization;
global using Identity.API.Filters.ExceptionFilter;
//global using Identity.API.Data.Seed;