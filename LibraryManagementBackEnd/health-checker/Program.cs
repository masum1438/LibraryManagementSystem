using Serilog;
using System.Diagnostics;

class Program
{
    static async Task Main(string[] args)
    {
        Log.Logger = new LoggerConfiguration()
            .WriteTo.Console()
            .WriteTo.File("health_metrics_log.txt", rollingInterval: RollingInterval.Day)
            .CreateLogger();

        Log.Information("Starting health logger.");

        var process = Process.GetCurrentProcess();

        while (true)
        {
            try
            {
                process.Refresh();
                var cpuUsage = GetCpuUsagePercent();
                var workingSetMb = process.WorkingSet64 / (1024.0 * 1024.0);

                var entry = new
                {
                    Time = DateTime.UtcNow,
                    CPU = cpuUsage,
                    MemoryMB = Math.Round(workingSetMb, 2)
                };

                Log.Information("Health: {@entry}", entry);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error recording health metrics");
            }

            await Task.Delay(TimeSpan.FromSeconds(10));
        }
    }

    static double GetCpuUsagePercent()
    {
        // Simplified CPU: measure by TotalProcessorTime over 1 sec
        using var p = Process.GetCurrentProcess();
        var start = (DateTime.UtcNow, p.TotalProcessorTime);
        Task.Delay(250).Wait();
        p.Refresh();
        var end = (DateTime.UtcNow, p.TotalProcessorTime);
        var usedMs = (end.TotalProcessorTime - start.Item2).TotalMilliseconds;
        var totalMs = (end.Item1 - start.Item1).TotalMilliseconds * Environment.ProcessorCount;
        if (totalMs <= 0) return 0;
        return (usedMs / totalMs) * 100;
    }
}