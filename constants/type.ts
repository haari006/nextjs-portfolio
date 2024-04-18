interface Image {
    src: string;
    width: number;
    height: number;
}

interface Framework {
    name: string;
    Image: string;
    width: number;
    height: number;
}

interface Cloud {
    name: string;
    Image: string;
    width: number;
    height: number;
}

interface Planet {
    id: string;
    name: string;
    link?: string;
    description: string;
    remark: string;
    images: Image[];
    frameworks: Framework[];
    cloud: Cloud[];
}

