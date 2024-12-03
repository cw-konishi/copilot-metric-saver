// model/Tenant.ts
import { getUsageApi } from '../api/GitHubApi'; 

export class Tenant {
    public scopeType: 'organization' | 'enterprise';
    public scopeName: string;
    public token: string;
    public isActive: boolean;
    public team: string;

    constructor(scopeType: 'organization' | 'enterprise', scopeName: string, token: string, team: string = '', isActive: boolean = true) {
        this.scopeType = scopeType;
        this.scopeName = scopeName;
        this.token = token;
        this.team = team;
        this.isActive = isActive;
    }

    public async validateTenant(): Promise<boolean> {
        try {
            await getUsageApi(this.scopeType, this.scopeName, this.token);
            return true;
        } catch (error) {
            console.error('Error validating tenant:', error);
            throw new Error('Invalid tenant information: scopeType, scopeName, or token is incorrect');
        }
    }
}