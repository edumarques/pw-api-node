import { loggerService } from "../di/services";
import ServiceReturnInterface from "../interfaces/serviceReturnInterface";
import PortfolioRepositoryInterface from "../interfaces/portfolioRepositoryInterface";
import PortfolioUserInterface from "../interfaces/portfolioUserInterface";

const NAMESPACE = 'portfolioService';

const axios = require('axios');

export default class PortfolioService {
    private gitHubUserUrl = 'https://api.github.com/users/edumarques';
    private gitHubRepositoriesUrl = 'https://api.github.com/users/edumarques/repos';

    public async getUser(): Promise<ServiceReturnInterface> {
        return await axios.get(this.gitHubUserUrl)
            .then((response: any): Object => {
                return {
                    data: PortfolioService.modelUserData(response.data)
                };
            })
            .catch((error: any) => {
                loggerService.error(NAMESPACE, error.message);
                return {
                    error: true,
                    message: error.message
                };
            });
    }

    public async getRepositories(groupByLanguage?: boolean): Promise<ServiceReturnInterface> {
        return await axios.get(this.gitHubRepositoriesUrl)
            .then((response: any): Object => {
                return {
                    data: this.modelRepositoriesData(response.data, groupByLanguage)
                };
            })
            .catch((error: any) => {
                loggerService.error(NAMESPACE, error.message);
                return {
                    error: true,
                    message: error.message
                };
            });
    }

    private static modelUserData(data: any): PortfolioUserInterface {
        return {
            gitHub_login: data.login,
            gitHub_avatar_url: data.avatar_url,
            gitHub_url: data.html_url,
            gitHub_name: data.name,
            gitHub_bio: data.bio,
            gitHub_repos: data.public_repos,
            gitHub_created_at: new Date(data.created_at),
            gitHub_updated_at: new Date(data.updated_at),
        };
    }

    private modelRepositoriesData(data: any[], groupByLanguage?: boolean): PortfolioRepositoryInterface[] {
        let modeledData: any[] = [];

        data.forEach((repository: any) => {
            if (!repository.fork) {
                modeledData.push({
                    name: repository.name,
                    description: repository.description,
                    url: repository.html_url,
                    language: repository.language,
                    created_at: new Date(repository.created_at),
                    updated_at: new Date(repository.updated_at),
                });
            }
        });

        modeledData = this.sortByCreatedAt(modeledData);

        if (groupByLanguage) {
            modeledData = this.groupByLanguage(modeledData);
        }

        return modeledData;
    }

    private sortByCreatedAt(data: PortfolioRepositoryInterface[]): PortfolioRepositoryInterface[] {
        data.sort((a: PortfolioRepositoryInterface, b: PortfolioRepositoryInterface): number => {
                return b.created_at.valueOf() - a.created_at.valueOf();
            }
        );

        return data;
    }

    private groupByLanguage(data: PortfolioRepositoryInterface[]): PortfolioRepositoryInterface[] {
        let orderedData: any = {};
        data.forEach((repository: PortfolioRepositoryInterface) => {
            let language = repository.language || 'Other';
            if (!orderedData[language]) {
                orderedData[language] = [];
            }
            orderedData[language].push(repository);
        });

        return orderedData;
    }
}