interface UserProfile {
  firstName: string;
  role: string;
  purpose: string;
}

interface UserData {
  id: number;
  firstName: string;
  role: string;
  purpose: string;
  bonusGenerations: number;
  totalGenerations: number;
}

export async function checkUserExists(telegramId: number): Promise<boolean> {
  // TODO: Replace with actual API call
  console.log('Checking user existence for ID:', telegramId);
  return false; // Stub: always return false to simulate new user
}

export async function registerUser(
  telegramId: number,
  profile: UserProfile,
  referrerId?: string
): Promise<UserData> {
  // TODO: Replace with actual API call
  console.log('Registering user:', { telegramId, profile, referrerId });
  
  // Stub: simulate successful registration
  return {
    id: telegramId,
    firstName: profile.firstName,
    role: profile.role,
    purpose: profile.purpose,
    bonusGenerations: referrerId ? 1 : 0, // Bonus generation if referred
    totalGenerations: 0
  };
}

export async function processReferral(referrerId: string, newUserId: number): Promise<void> {
  // TODO: Replace with actual API call
  console.log('Processing referral:', { referrerId, newUserId });
  // Stub: In real implementation, this would update both users' bonus generations
}