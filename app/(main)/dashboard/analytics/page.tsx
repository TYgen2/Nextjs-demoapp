import { Card, CardHeader } from "@/components/ui/card"
import VisibilityIcon from '@mui/icons-material/Visibility';
import PageviewIcon from '@mui/icons-material/Pageview';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const AnalyticsPage = () => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 overflow-auto">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Card className="aspect-video rounded-xl bg-slate-900 shadow-lg">
                    <CardHeader className="text-xl md:text-sm lg:text-xl xl:text-sm 2xl:text-xl text-white font-bold flex flex-row items-center gap-2">
                        <MonetizationOnIcon />
                        Revenue
                    </CardHeader>
                </Card>

                <Card className="aspect-video rounded-xl bg-slate-900 shadow-lg">
                    <CardHeader className="text-xl md:text-sm lg:text-xl xl:text-sm 2xl:text-xl text-white font-bold flex flex-row items-center gap-2">
                        <VisibilityIcon />
                        Profile visits
                    </CardHeader>
                </Card>

                <Card className="aspect-video rounded-xl bg-slate-900 shadow-lg">
                    <CardHeader className="text-xl md:text-sm lg:text-xl xl:text-sm 2xl:text-xl text-white font-bold flex flex-row items-center gap-2">
                        <PageviewIcon />
                        Products total views
                    </CardHeader>
                </Card>

                <Card className="aspect-video rounded-xl bg-slate-900 shadow-lg">
                    <CardHeader className="text-xl md:text-sm lg:text-xl xl:text-sm 2xl:text-xl text-white font-bold flex flex-row items-center gap-2">
                        <TrendingUpIcon />
                        Trending product
                    </CardHeader>
                </Card>

            </div>

            <div className="grid auto-rows-min xl:flex xl:flex-1 gap-4">
                <Card className="aspect-video xl:w-1/3 rounded-xl bg-slate-900 shadow-lg">
                    <CardHeader className="text-xl text-white font-bold flex flex-row items-center gap-2">
                        <AutoAwesomeIcon />
                        Best selling product
                    </CardHeader>
                </Card>

                <Card className="aspect-video xl:flex-1 rounded-xl bg-slate-900 shadow-lg">
                    <CardHeader className="text-xl text-white font-bold flex flex-row items-center gap-2">
                        <MonetizationOnIcon />
                        Best selling product
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}

export default AnalyticsPage