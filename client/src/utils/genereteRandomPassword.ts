const generateRandomPassword = (): string => {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength: number = 6;
    let newPassword: string = '';
  
    for (let i: number = 0; i < passwordLength; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      newPassword += characters.charAt(randomIndex);
    }
  
    return newPassword;
  };
  
  export default generateRandomPassword;