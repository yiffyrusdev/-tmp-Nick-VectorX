﻿using VectorXBackend.DTOs.Requests.AccountService;
using VectorXBackend.DTOs.Responses.AccountService;

namespace VectorXBackend.Interfaces.Services
{
    public interface IAccountService
    {
        Task<AuthResponseDto> AuthorizeUser(UserDto userDto);

        Task<AuthResponseDto> RegisterUser(UserDto userDto);

        Task<VerifyResponseDto> VerifyUser(VerifyUserDto verifyUserDto);

        Task<UserDataRedactDto> RedactUserData(UsernameRedactDto usernameRedactDto);

        Task<UserDataRedactDto> RedactUserData(PasswordRedactDto passwordRedactDto);

        Task<UserDataRedactDto> RedactUserData(AvatarRedactDto avatarRedactDto);
    }
}
