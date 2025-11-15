export interface HealthCheck{
    status : string;
    totalDuration: Date;
    checks: Array<HealthCheckItem>;
}

export interface HealthCheckItem{
    domain:string;
    entry:string;
    description:string;
    duration:Date;
    status:string;
    errorMessage:string;
    data: HealthCheckData;
    tags: Array<string>
}

export interface HealthCheckData {
    description:string;
    details:string;
}